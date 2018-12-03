import './index.html'
import {StackChartVisualization } from './StackChart'
import { RequestHandler } from './RequestHandler';
import { handleResponse } from './ResponseHandler';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

function StackChart(Private) {
    const VisFactory = Private(VisFactoryProvider);
    const requestHandler = Private(RequestHandlerProvider);

    return VisFactory.createBaseVisualization({
        name: 'Stack-Chart',
        title: 'Stack-Chart',
        icon: 'fa fa-bars',
        description: 'StackChart Visualization',
        category: category.OTHER,
        visualization: StackChartVisualization,
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
        
     }
    });
}

VisTypesRegistryProvider.register(StackChart);