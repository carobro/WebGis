import optionsTemplate from './options_template.html';
import {StackChart_Visualization } from './StackChart_Visualization'
import { RequestHandlerProvider } from './RequestHandler';
import { handleResponse } from './ResponseHandler';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

function StackChart_Provider(Private) {
    const VisFactory = Private(VisFactoryProvider);
    const requestHandler = Private(RequestHandlerProvider);

    return VisFactory.createBaseVisualization({
        name: 'Stack-Chart',
        title: 'Stack-Chart',
        icon: 'fa fa-bars',
        description: 'StackChart',
        category: CATEGORY.OTHER,
        visualization: StackChart_Visualization,
        responseHandler: handleResponse,
        requestHandler: requestHandler.handle,
        visConfig: {
            defaults: {
                index: 'user_study_5',
                timeField: 'timestamp',
                zoomField: 'map_zoom'
            },
        },
        editorConfig: {
            optionsTemplate: optionsTemplate
          }
      });
}

VisTypesRegistryProvider.register(StackChart_Provider);