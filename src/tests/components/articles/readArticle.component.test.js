import configureMockStore from 'redux-mock-store';
import React from 'react';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import DefaultReadArticle, { ReadArticle } from '../../../components/article/ReadArticle';

const mockStore = configureMockStore([thunk]);
describe('Read Article component', () => {
  let wrapper, store, props, fetchSingleArticle, initialState;
  beforeEach(() => {
    props = {
      article: {
        Tags: [],
        User: {
          email: null,
          firstname: null,
          id: 5,
          image: null,
          lastname: null,
          reset_password_hash: null
        },
        body: '<p>The story started few years back</p>',
        createdAt: '2018-10-15T11:27:58.250Z',
        description: '<p>the description</p>',
        id: 71,
        readingTime: '1 min read',
        slug: 'new-article',
        title: 'new article',
        updatedAt: '2018-10-15T11:27:58.250Z',
        userId: 5

      },
      fetchSingleArticle: jest.fn(),
      match: {
        params: { slug: 'new-article' }
      },
      location: { pathname: '/articles/new-article' },
      history: {}
    };
    initialState = {
      articleReducer: {
        articles: [
          {
            Tags: [],
            User: {
              email: null,
              firstname: null,
              id: 5,
              image: null,
              lastname: null,
              reset_password_hash: null
            },
            body: '<p>The story started few years back</p>',
            createdAt: '2018-10-15T11:27:58.250Z',
            description: '<p>the description</p>',
            id: 71,
            readingTime: '1 min read',
            slug: 'new-article',
            title: 'Writing a new article',
            updatedAt: '2018-10-15T11:27:58.250Z',
            userId: 5
          }, {
            Tags: [],
            User: {
              email: null,
              firstname: null,
              id: 5,
              image: null,
              lastname: null,
              reset_password_hash: null
            },
            body: '<p>The story started few years back when i was</p>',
            createdAt: '2018-10-15T11:27:58.250Z',
            description: '<p>the description of new article</p>',
            id: 71,
            readingTime: '1 min read',
            slug: 'new-article-edited',
            title: 'Writing a new article in a new dimension',
            updatedAt: '2018-10-15T11:27:58.250Z',
            userId: 5
          }
        ]
      }
    };
    fetchSingleArticle = sinon.stub(props, 'fetchSingleArticle');
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <DefaultReadArticle {...props} />
      </Provider>
    );
  });

  it('should render Article page correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('ComponentDidMount', () => {
    wrapper = shallow(<ReadArticle {...props} />);
    expect(fetchSingleArticle.calledOnce).toBe(true);
  });

  it('should display the necessary element', () => {
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('div').length).toBe(3);
  });

  it('ComponentDidMount', () => {
    const newProp = { ...props, artcile: null };
    wrapper = shallow(<ReadArticle {...newProp} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Loading')).toBeDefined();
  });
});
