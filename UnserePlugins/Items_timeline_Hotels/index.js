export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/items_timeline_hotels/items_timeline_hotels_Provider'
      ]
    }
  });
}
