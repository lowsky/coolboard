import React from 'react';
import TimeAgo from 'react-timeago';
import { Alert, AlertDescription, Avatar, Box } from '@chakra-ui/react';

import { Segment } from 'common/Segment';
import type { User } from 'src/setupInstaWeb';

export type AuthorTimeInfoProps = {
  createdAt: number;
  updatedAt: number;
  updatedBy: User;
};

export function AuthorTimeInfo({
  createdAt,
  updatedAt,
  updatedBy,
}: AuthorTimeInfoProps) {
  return (
    <Segment>
      <Alert status="info">
        <AlertDescription>
          <Box>
            <strong>created: </strong>
            <TimeAgo date={createdAt} />
          </Box>
          <Box>
            <strong>updated: </strong>
            <TimeAgo date={updatedAt} />
            {updatedBy && (
              <>
                <strong> by: </strong>
                {updatedBy.avatarUrl && <Avatar src={updatedBy?.avatarUrl} />}
                <span>
                  {updatedBy.name
                    ? updatedBy.name
                    : updatedBy.email
                      ? updatedBy.email
                      : '?'}
                </span>
              </>
            )}
          </Box>
        </AlertDescription>
      </Alert>
    </Segment>
  );
}
