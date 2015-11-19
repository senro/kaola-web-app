var protocol = window.location.protocol + '//',
    host = window.location.host,
    apiHost='{{apiHost}}',
    baseUrl = protocol + host +'{{baseUrl}}';

window.baseUrl = baseUrl;
window.apiHost = apiHost;