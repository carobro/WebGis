export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/finished_realestatesession_indicator/Finished_Realestatesession_Indicator_Provider'
      ]
    }
  });
}
