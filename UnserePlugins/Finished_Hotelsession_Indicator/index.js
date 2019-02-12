export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/finished_hotelsession_indicator/Finished_Hotelsession_Indicator_Provider'
      ]
    }
  });
}
