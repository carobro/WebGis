import optionsTemplate from './options_template.html';
import FirstItemVisualization from './FirstItemVisualization';
import { RequestHandlerProvider } from './RequestHandlerProvider';
import { handleResponse } from './ResponseHandler';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

function FirstItemProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const requestHandler = Private(RequestHandlerProvider);

  return VisFactory.createBaseVisualization({
    name: 'first_item_selected_map',
    title: 'first_item_selected_map',
    icon: 'fa fa-map',
    description: 'first_item_selected_map',
    category: CATEGORY.OTHER,
    visualization: FirstItemVisualization,
    responseHandler: handleResponse,
    requestHandler: requestHandler.handle,
    visConfig: {
      defaults: {
		    appField: 'app_id',
        index: 'user_study_5',
        sessionField: 'session.keyword',
        timeField: 'timestamp',
        geoField: 'map_center',
        scaleField: 'map_scale',
        actionField: 'message.keyword',
        actionValue: 'resultcenter ITEM_SELECTED',
        maxSessionLength: 10000,
        maxSessionCount: 10000
      },
    },
    editorConfig: {
      optionsTemplate: optionsTemplate
    }
  });
}

VisTypesRegistryProvider.register(FirstItemProvider);