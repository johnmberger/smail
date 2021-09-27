import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import axios from 'axios';

import { formatMessages } from './store-utilities';

// the only interface we're using, otherwise i'd probably pull these into a separate file
export interface Message {
  id: string;
  subject: string;
  sender: string;
  body: string;
  tags: string[];
  date: Date;
  starred: boolean;
  unread: boolean;
  deleted: boolean;
}

// define typings
export interface State {
  loading: boolean;
  error: boolean;
  messages: Message[];
  selectedMessageIds: string[];
  searchQuery: string;
  selectionGroup: 'Inbox' | 'Trash' | string;
  selectedMessageId: string | null;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    loading: false,
    error: false,
    messages: [],
    selectedMessageIds: [],
    searchQuery: '',
    selectionGroup: 'Inbox',
    selectedMessageId: null,
  },
  actions: {
    async getMessages({ commit }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        // mocking out the api request.
        // if this was a real app, i'd obviously use a real api
        // and separate this concern to another file
        const response = await axios.get('assets/emails.json');
        const messages = response.data?.messages;
        const formattedMessages = formatMessages(messages);
        commit('SET_MESSAGES', formattedMessages);
      } catch (e) {
        commit('SET_ERROR', true);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    selectMessages(
      { state, commit },
      { ids, isSelected }: { ids: string[]; isSelected: boolean },
    ) {
      let selectedMessageIds = [...state.selectedMessageIds];
      if (isSelected) {
        selectedMessageIds.push(...ids);
      } else {
        ids.forEach(
          (id) =>
            (selectedMessageIds = selectedMessageIds.filter((m) => m !== id)),
        );
      }
      // remove duplicates
      selectedMessageIds = [...new Set(selectedMessageIds)];

      commit('SET_SELECTED_MESSAGE_IDS', selectedMessageIds);
    },
    selectAllMessages({ state, commit }, { isSelected }) {
      if (isSelected) {
        commit(
          'SET_SELECTED_MESSAGE_IDS',
          state.messages.map((m) => m.id),
        );
      } else {
        commit('SET_SELECTED_MESSAGE_IDS', []);
      }
    },
    setSearchQuery({ commit }, query) {
      commit('SET_SEARCH_QUERY', query);
    },
    setSelectionGroup({ commit }, group) {
      commit('SET_SELECTION_GROUP', group);
    },
    toggleStarred({ commit }, { isStarred }: { isStarred: boolean }) {
      const { selectedMessageIds } = this.state;
      selectedMessageIds.forEach((id) => {
        commit('TOGGLE_STARRED', { id, isStarred });
      });
    },
    toggleIndividualStar(
      { commit },
      { id, isStarred }: { id: string; isStarred: boolean },
    ) {
      commit('TOGGLE_STARRED', { id, isStarred });
    },
    toggleUnread({ commit }, { isStarred }: { isStarred: boolean }) {
      const { selectedMessageIds } = this.state;
      selectedMessageIds.forEach((id) => {
        commit('TOGGLE_STARRED', { id, isStarred });
      });
    },
    toggleDeleted({ commit }, { isDeleted }: { isDeleted: boolean }) {
      const { selectedMessageIds } = this.state;
      selectedMessageIds.forEach((id) => {
        commit('TOGGLE_DELETED', { id, isDeleted });
      });
    },
    deleteIndividualMessage({ commit }, { id }: { id: string }) {
      commit('TOGGLE_DELETED', { id, isDeleted: true });
    },
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_MESSAGES(state, messages) {
      state.messages = messages;
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
    SET_SELECTION_GROUP(state, group) {
      state.selectionGroup = group;
    },
    TOGGLE_STARRED(state, { id, isStarred }) {
      const messagesToStar = state.messages.find((m) => m.id === id);
      if (!!messagesToStar)
        Object.assign(messagesToStar, { starred: isStarred });
    },
    TOGGLE_UNREAD(state, { id, isUnread }) {
      const messagesToSetUnread = state.messages.find((m) => m.id === id);
      if (!!messagesToSetUnread)
        Object.assign(messagesToSetUnread, { unread: isUnread });
    },
    TOGGLE_DELETED(state, { id, isDeleted }) {
      const messagesToSetDeleted = state.messages.find((m) => m.id === id);
      if (!!messagesToSetDeleted)
        Object.assign(messagesToSetDeleted, { deleted: isDeleted });
    },
    SET_SELECTED_MESSAGE_IDS(state, messageIds) {
      state.selectedMessageIds = messageIds;
    },
  },
  getters: {
    getAllTags(state) {
      const tags = state.messages.map(({ tags }) => tags);
      return [...new Set(tags.flat())];
    },
    getFilteredMessages(state): Message[] {
      return (
        state.messages
          // apply search parameters
          .filter((message: Message) => {
            const { subject, body } = message;
            const { searchQuery } = state;
            return subject.includes(searchQuery) || body.includes(searchQuery);
          })
          .filter((message: Message) => {
            // apply selection group
            const { selectionGroup } = state;

            if (selectionGroup === 'Trash') {
              return message.deleted;
            } else if (selectionGroup === 'Inbox') {
              // show everything but deleted messages
              return !message.deleted;
            } else if (selectionGroup === 'Starred') {
              return message.starred;
            } else {
              return message.tags.includes(selectionGroup);
            }
          })
      );
    },
    isSelected(state) {
      return (id: string) => {
        return state.selectedMessageIds.includes(id);
      };
    },
    allSelected(state) {
      return state.selectedMessageIds.length === state.messages.length;
    },
  },
});
