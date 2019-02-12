import optionsTemplate from './options_template.html';
import Levels_hotels_with_indicators_Visualization from './Levels_hotels_with_indicators_Visualization';
import { RequestHandlerProvider } from './RequestHandlerProvider';
import { handleResponse } from './ResponseHandler';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

function Levels_hotels_with_indicators_Provider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const requestHandler = Private(RequestHandlerProvider);

  return VisFactory.createBaseVisualization({
    name: 'Levels hotels with indicators',
    title: 'Levels hotels with indicators',
    icon: 'fa fa-map-pin',
    description: 'Levels hotels with indicators',
    category: CATEGORY.OTHER,
    visualization: Levels_hotels_with_indicators_Visualization,
    responseHandler: handleResponse,
    requestHandler: requestHandler.handle,
    visConfig: {
      defaults: {
        appField: 'app_id.keyword',
        appValue: 'hotels_with_indicators',
        index: 'user_study_5',
        sessionField: 'session.keyword',
        timeField: 'timestamp',
        geoField: 'map_center',
        scaleField: 'map_scale',
        actionField: 'message.keyword',
        actionValue: 'map-init CENTER_CHANGED',
        maxSessionLength: 100,
        maxSessionCount: 100
      },
    },
    editorConfig: {
      optionsTemplate: optionsTemplate
    }
  });
}

VisTypesRegistryProvider.register(Levels_hotels_with_indicators_Provider);