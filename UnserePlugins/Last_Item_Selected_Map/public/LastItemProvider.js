import optionsTemplate from './options_template.html';
import LastItemVisualization from './LastItemVisualization';
import { RequestHandlerProvider } from './RequestHandlerProvider';
import { handleResponse } from './ResponseHandler';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

function LastItemProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const requestHandler = Private(RequestHandlerProvider);

  return VisFactory.createBaseVisualization({
    name: 'last_item_selected_map',
    title: 'last_item_selected_map',
    icon: 'fa fa-map',
    description: 'last_item_selected_map',
    category: CATEGORY.OTHER,
    visualization: LastItemVisualization,
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
        maxSessionLength: 100,
        maxSessionCount: 100
      },
    },
    editorConfig: {
      optionsTemplate: optionsTemplate
    }
  });
}

VisTypesRegistryProvider.register(LastItemProvider);