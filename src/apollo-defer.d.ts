/*
Start: Inserted by Apollo Client 3->4 migration codemod.
via

yarn dlx  @apollo/client-codemod-migrate-3-to-4 --parser ts --extensions ts src

Copy the contents of this block into a `.d.ts` file in your project to enable correct response types in your custom links.
If you do not use the `@defer` directive in your application, you can safely remove this block.
*/

import '@apollo/client';
import { Defer20220824Handler } from '@apollo/client/incremental';

declare module '@apollo/client' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface TypeOverrides extends Defer20220824Handler.TypeOverrides {}
}

/*
End: Inserted by Apollo Client 3->4 migration codemod.
*/
