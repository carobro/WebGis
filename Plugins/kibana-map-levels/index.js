export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/levels/LevelsProvider'
      ]
    }
  });
}
