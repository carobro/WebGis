import optionsTemplate from './options_template.html';
import LevelsVisualization from './LevelsVisualization';
import { RequestHandlerProvider } from './RequestHandlerProvider';
import { handleResponse } from './ResponseHandler';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

function LevelsProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const requestHandler = Private(RequestHandlerProvider);

  return VisFactory.createBaseVisualization({
    name: 'esri-Levels',
    title: 'Map Scales',
    icon: 'fa fa-map',
    description: 'Map Scales',
    category: CATEGORY.OTHER,
    visualization: LevelsVisualization,
    responseHandler: handleResponse,
    requestHandler: requestHandler.handle,
    visConfig: {
      defaults: {
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

VisTypesRegistryProvider.register(LevelsProvider);