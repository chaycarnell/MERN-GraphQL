import React, { useState } from 'react';
import styled from 'styled-components';
import { getSomeUpdate, onSomeUpdate } from '../queries/queries.graphql';
import {
  useQuery,
  useSubscription,
  useLazyQuery,
  useApolloClient
} from '@apollo/react-hooks';

const Container = styled('div')`
  display: grid;
  grid-gap: 20px;
  width: 100%;
  justify-content: center;
`;

const ContentWrapper = styled('div')`
  padding: 15px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 180px 10px;
  align-content: center;
`;

const Render = () => {
  const [clientResponse, setClientResponse] = useState(null);
  // Create a reference to the Apollo Client instance
  const apolloClient = useApolloClient();
  // Example of useQuery hook
  const query = useQuery(getSomeUpdate, {
    onCompleted: res => console.log('Use Query: \n', res)
  });
  // Example of setting up subscriptions with useSubscription hook
  const subscription = useSubscription(onSomeUpdate, {
    onSubscriptionData: res => console.log('Use Subscription: \n', res)
  });
  // Example of useLazyQuery, useful to trigger queries form button clicks etc
  const [getUpdate, { data, error, loading }] = useLazyQuery(getSomeUpdate, {
    onCompleted: res => console.log('Lazy Query: \n', res)
  });

  // Example of using the Apollo Client directly
  const queryWithClient = variables => {
    apolloClient.query({ query: getSomeUpdate, variables }).then(res => {
      setClientResponse(res);
      console.log('Client Query: \n', res);
    });
  };

  if (loading || error) return <div>Loading...</div>;

  return (
    <Container>
      <ContentWrapper>
        <div>UseQuery Response:</div>
        <div>{query && query.data && query.data.someUpdate.status}</div>
      </ContentWrapper>
      <ContentWrapper>
        <div>UseLazy Response:</div>
        <div>{data && data.someUpdate.status}</div>
      </ContentWrapper>
      <ContentWrapper>
        <div>UseClient Response:</div>
        <div>
          {clientResponse &&
            clientResponse.data &&
            clientResponse.data.someUpdate.status}
        </div>
      </ContentWrapper>
      <ContentWrapper>
        <div>Subscription Response:</div>
        <div>
          {subscription &&
            subscription.data &&
            subscription.data.someUpdate.status}
        </div>
      </ContentWrapper>
      <button
        onClick={() =>
          getUpdate({
            variables: { id: 1 }
          })
        }
      >
        Lazy Query
      </button>
      <button onClick={() => queryWithClient({ id: 1 })}>Client Query</button>
    </Container>
  );
};

export default Render;
