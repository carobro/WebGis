import optionsTemplate from './options_template.html';
import Finished_Realestatesession_Visualization from './Finished_Realestatesession_Visualization';
import { RequestHandlerProvider } from './RequestHandlerProvider';
import { handleResponse } from './ResponseHandlerProvider';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

function Finished_Realestatesession_Provider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const requestHandler = Private(RequestHandlerProvider);

  return VisFactory.createBaseVisualization({
    name: 'Finished_Realestatesession_',
    title: 'Finished_Realestatesession_',
    icon: 'fa fa-hourglass-end',
    description: 'Finished_Realestatesession_',
    category: CATEGORY.OTHER,
    visualization: Finished_Realestatesession_Visualization,
    responseHandler: handleResponse,
    requestHandler: requestHandler.handle,
    visConfig: {
      defaults: {
        appField: 'app_id.keyword',
        appValue: 'realestate_without_indicators',
        sessionField: 'session.keyword',
        actionField: 'message',
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
VisTypesRegistryProvider.register(Finished_Realestatesession_Provider);