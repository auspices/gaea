import React from 'react';
import { Query } from 'react-apollo';

import collectionsQuery from './queries/collections';

import Link from 'components/UI/Link';
import Header from 'components/Header';
import CreateCollection from 'components/CreateCollection';
import Collections from 'components/Collections';
import { WithAlerts } from 'components/Alerts';

export default WithAlerts(({ dispatchError }) => (
  <Query query={collectionsQuery} onError={dispatchError} fetchPolicy="network-only">
    {({ data, loading, error }) => {
      if (error) return null;

      if (loading) {
        return <Header isLoading />;
      }

      const { me: { username, collections } } = data;

      return (
        <>
          <Header>
            <Link key="name" to="/collections">
              {username}
            </Link>

            <CreateCollection key="input" />
          </Header>

          <Collections
            mt="-1px"
            collections={collections}
          />
        </>
      );
    }}
  </Query>
));
