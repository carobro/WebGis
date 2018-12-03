export default function (kibana) {
    return new kibana.Plugin({
        uiExports: {
            visType: [
                'plugins/StackChart/vis_type'
            ]
        }
    })
}