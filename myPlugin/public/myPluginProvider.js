/*import './style.css';
import optionsTemplate from './options_template.html';
*/
import SankeyVisualization from './myPluginVisualization';
import { RequestHandlerProvider } from './RequestHandlerProvider';
import { handleResponse } from './ResponseHandler';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

function SankeyProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const requestHandler = Private(RequestHandlerProvider);

  return VisFactory.createBaseVisualization({
    name: 'myPlugin',
    title: 'myPlugin',
    icon: 'fa fa-area-chart',
    description: 'my Plugin',
    category: CATEGORY.OTHER,
    visualization: myPluginVisualization,
    responseHandler: handleResponse,
    requestHandler: requestHandler.handle,
    visConfig: {
        defaults: {  //ggf. anpassen
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

VisTypesRegistryProvider.register(myPluginProvider);