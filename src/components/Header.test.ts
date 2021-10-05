// @ts-nocheck
import { mount } from '@vue/test-utils';
import { store, key } from '../store';
import HeaderComponent from './Header.vue';

const wrapper = mount(HeaderComponent, {
  global: {
    plugins: [[store, key]],
  },
});

describe('Header.vue', () => {
  test('Header contains search input field', () => {
    const search = wrapper.get('input');
    expect(search).toBeTruthy();
  });

  test('Header contains logo', () => {
    const img = wrapper.get('img');
    expect(img).toBeTruthy();
  });

  test('search input field reflects vuex searchQuery', async () => {
    const searchQuery = 'Test Query!';
    await store.dispatch('setSearchQuery', searchQuery);

    expect(wrapper.vm.searchQuery).toBe(searchQuery);
  });
});
