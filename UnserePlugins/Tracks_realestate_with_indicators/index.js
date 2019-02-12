export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/tracks_realetstate_with_indicators/TracksProvider'
      ]
    }
  });
}
