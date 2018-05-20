import { shallow, mount } from 'enzyme';
import React from 'react';

import CoinListItem from 'containers/CoinListItem';
import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import CoinsList from '../index';

describe('<CoinsList />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(<CoinsList loading />);
    expect(
      renderedComponent.contains(<List component={LoadingIndicator} />)
    ).toEqual(true);
  });

  it('should render an error if loading failed', () => {
    const renderedComponent = mount(
      <CoinsList loading={false} error={{ message: 'Loading failed!' }} />
    );
    expect(renderedComponent.text()).toMatch(/Something went wrong/);
  });

  it('should render the repositories if loading was successful', () => {
    const repos = [
      {
        owner: {
          login: 'flexdinesh'
        },
        html_url: 'https://github.com/flexdinesh/react-redux-boilerplate',
        name: 'react-redux-boilerplate',
        open_issues_count: 20,
        full_name: 'flexdinesh/react-redux-boilerplate'
      }
    ];
    const renderedComponent = shallow(
      <CoinsList repos={repos} error={false} />
    );

    expect(
      renderedComponent.contains(
        <List items={repos} component={CoinListItem} />
      )
    ).toEqual(true);
  });

  it('should not render anything if nothing interesting is provided', () => {
    const renderedComponent = shallow(
      <CoinsList repos={false} error={false} loading={false} />
    );

    expect(renderedComponent.html()).toEqual(null);
  });
});
