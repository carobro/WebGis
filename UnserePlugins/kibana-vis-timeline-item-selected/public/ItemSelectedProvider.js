import optionsTemplate from './options_template.html';
import ItemSelectedVisualization from './ItemSelectedVisualization';
import { RequestHandlerProvider } from './RequestHandlerProvider';
import { handleResponse } from './ResponseHandler';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

function ItemSelectedProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const requestHandler = Private(RequestHandlerProvider);

  return VisFactory.createBaseVisualization({
    name: 'itemSelected',
    title: 'Item-Selected',
    icon: 'fa fa-line-chart',
    description: 'itemSelected',
    category: CATEGORY.OTHER,
    visualization: ItemSelectedVisualization,
    responseHandler: handleResponse,
    requestHandler: requestHandler.handle,
    visConfig: {
      defaults: {
        sessionField: 'session.keyword',
        actionField: 'message.keyword',
        timeField: 'timestamp',
        maxSessionCount: 10,
        maxSessionLength: 20,
        index: 'user_study_5'
      },
    },
    editorConfig: {
      optionsTemplate: optionsTemplate
    }
  });
}

VisTypesRegistryProvider.register(ItemSelectedProvider);