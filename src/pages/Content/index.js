import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';

import contentQuery from './queries/content';

export default class Content extends PureComponent {
  render() {
    const { id, type } = this.props;

    return (
      <Query query={contentQuery} variables={{ id, type }}>
        {({ data, loading, error }) => {
          if (loading) return '...';
          if (error) return error.message;

          const { content } = data;

          switch (content.__typename) {
            case 'Image':
              return (
                <img
                  src={content.resized.urls._1x}
                  srcSet={`${content.resized.urls._1x} 1x, ${content.resized.urls._2x} 2x`}
                  alt={content.title}
                  title={content.title}
                  width={content.resized.width}
                  height={content.resized.height}
                />
              );
            default:
              return content.__typename;
          }
        }}
      </Query>
    );
  }
}
