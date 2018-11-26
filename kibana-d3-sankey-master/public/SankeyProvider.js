import './style.css';
import optionsTemplate from './options_template.html';
import SankeyVisualization from './SankeyVisualization';
import { RequestHandlerProvider } from './RequestHandlerProvider';
import { handleResponse } from './ResponseHandler';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

function SankeyProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const requestHandler = Private(RequestHandlerProvider);

  return VisFactory.createBaseVisualization({
    name: 'sankey',
    title: 'Sankey',
    icon: 'fa fa-area-chart',
    description: 'Sankey Diagram',
    category: CATEGORY.OTHER,
    visualization: SankeyVisualization,
    responseHandler: handleResponse,
    requestHandler: requestHandler.handle,
    visConfig: {
      defaults: {
        sessionField: 'session_id.keyword',
        actionField: 'topic',
        timeField: 'timestamp',
        maxSessionCount: 100,
        maxSessionLength: 30,
        filterPosition: 'source',
      },
    },
    editorConfig: {
      optionsTemplate: optionsTemplate
    }
  });
}

VisTypesRegistryProvider.register(SankeyProvider);