export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/tracks_hotels_without_indicators/TracksProvider'
      ]
    }
  });
}
