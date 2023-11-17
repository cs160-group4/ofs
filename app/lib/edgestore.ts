'use client';

/*
  Author: Kyle Chen
  Email: kyle.chen@sjsu.edu
  Copyright (c) 2023 Kyle Chen. All rights reserved.
*/ 

import { createEdgeStoreProvider } from '@edgestore/react';
import { type EdgeStoreRouter } from '../api/edgestore/[...edgestore]/route';
 
const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>();
 
export { EdgeStoreProvider, useEdgeStore };
