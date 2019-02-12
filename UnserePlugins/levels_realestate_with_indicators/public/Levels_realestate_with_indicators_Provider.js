import optionsTemplate from './options_template.html';
import Levels_realestate_with_indicators_Visualization from './Levels_realestate_with_indicators_Visualization';
import { RequestHandlerProvider } from './RequestHandlerProvider';
import { handleResponse } from './ResponseHandler';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

function Levels_realestate_with_indicators_Provider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const requestHandler = Private(RequestHandlerProvider);

  return VisFactory.createBaseVisualization({
    name: 'Levels realestate with indicators',
    title: 'Levels realestate with indicators',
    icon: '	fa fa-map-pin',
    description: 'Levels realestate with indicators',
    category: CATEGORY.OTHER,
    visualization: Levels_realestate_with_indicators_Visualization,
    responseHandler: handleResponse,
    requestHandler: requestHandler.handle,
    visConfig: {
      defaults: {
        appField: 'app_id.keyword',
        appValue: 'realestate_with_indicators',
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

VisTypesRegistryProvider.register(Levels_realestate_with_indicators_Provider);