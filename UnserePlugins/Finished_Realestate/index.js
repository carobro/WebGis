export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/finished_realestatesession/Finished_Realestatesession_Provider'
      ]
    }
  });
}
