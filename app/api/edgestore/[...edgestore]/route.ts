import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { initEdgeStoreClient } from '@edgestore/server/core';

/*
  Author: Kyle Chen
  Email: kyle.chen@sjsu.edu
  Copyright (c) 2023 Kyle Chen. All rights reserved.
*/

const es = initEdgeStore.create();
const KB = 1024
const MB = KB * KB
/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es
  
  .fileBucket({
    maxSize: MB * 2,
    accept: ['image/jpeg', 'image/png'],
  })
  
  .beforeDelete(({ ctx, fileInfo }) => {
    return true; // allow delete
  })
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});


const edgeStoreClient = initEdgeStoreClient({
  router: edgeStoreRouter,
});


export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;