import TimeAgo from 'react-timeago';
import { AlertDescription, Box } from '@chakra-ui/react';

import { Segment } from 'common/Segment';
import type { User } from 'src/gql/graphql';
import { Alert } from 'components/ui/alert';
import { Avatar } from 'components/ui/avatar';

export interface AuthorTimeInfoProps {
  createdAt: number;
  updatedAt: number;
  updatedBy: User | undefined;
}

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
