/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import optionsTemplate from './options_template.html';
import Points_hotels_without_indicatorsVisualization from './Points_hotels_without_indicatorsVisualization';
import { RequestHandlerProvider } from './RequestHandlerProvider';
import { handleResponse } from './ResponseHandler';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

function Points_hotels_without_indicatorsProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const requestHandler = Private(RequestHandlerProvider);

  return VisFactory.createBaseVisualization({
    name: 'Point-density-Map_Hotels-without-indicators',
    title: 'Point-density-Map_Hotels-without-indicators',
    icon: 'far fa-circle',
    description: 'Point-density-Map_Hotels-without-indicators',
    category: CATEGORY.OTHER,
    visualization: Points_hotels_without_indicatorsVisualization,
    responseHandler: handleResponse,
    requestHandler: requestHandler.handle,
    visConfig: {
      defaults: {
        appField: 'app_id.keyword',
        appValue: 'hotels_without_indicators',
        index: 'user_study_5',
        actionField: 'message.keyword',
        actionValue: 'resultcenter ITEM_SELECTED', // item selected
      },
    },
    editorConfig: {
      optionsTemplate: optionsTemplate
    }
  });
}

VisTypesRegistryProvider.register(Points_hotels_without_indicatorsProvider);