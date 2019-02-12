export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/finished_hotelsession/Finished_Hotelsession_Provider'
      ]
    }
  });
}
