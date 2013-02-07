
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    // Receipt verification (https://github.com/mozilla/receiptverifier)
    require('receiptverifier');

    // Installation button
    require('./install-button');

    // Install the layouts
    require('layouts/layouts');

    // Write your app here.


    function formatDate(d) {
        return (d.getMonth()+1) + '/' +
            d.getDate() + '/' +
            d.getFullYear();
    }

    // List view

    var api_list = [
      ['SystemXHR', '', 1],
      ['Camera API', '', 1],
      ['Alarm API', '', 0],
      ['attention screen', '', 1],
      ['Audio Policy', '', 1],
      ['Background Sensor', '', 0],
      ['Background services', '', 1],
      ['Browser API', '', 0],
      ['Camera API', '', 1],
      ['Contacts API', '', 1],
      ['Workaround', '', 0],
      ['Desktop Notification', '', 1],
      ['Device Storage API', '', 1],
      ['Embed Apps', '', 1],
      ['FM Radio', '', 1],
      ['Geolocation API', '', 1],
      ['IdleAPI', '', 1],
      ['MobileConnection API', '', 1],
      ['Network Events', '', 1],
      ['Network Stats Manage', '', 1],
      ['Open out-of-process windows', '', 1],
      ['Permissions', '', 1],
      ['PowerManagement API', '', 1],
      ['Settings API', '', 1],
      ['WebSMS', '', 1],
      ['Storage', '', 1],
      ['SystemXHR', '', 1],
      ['TCP Socket API', '', 1],
      ['WebTelephony', '', 1],
      ['TimeManager', '', 1],
      ['Voicemail', '', 1],
      ['Open Webapps', '', 1],
      ['WiFi Management API', '', 1]
    ];
    var list = $('.list').get(0);

    api_list.forEach(function(api) {
      var onoff = (api[2] ? '[on] ' : '[off] ');
      var desc = (api[1] ? api[1] : 'Sample usage of the API');
      api_item = { title: onoff + api[0] };
      if (api[2]) {
        api_item['desc'] = desc;
      }
      list.add(api_item);
    });

    // Detail view

    var detail = $('.detail').get(0);
    detail.render = function(item) {
        $('.title', this).html(item.get('title'));
        $('.desc', this).html(item.get('desc'));
        $('.date', this).text(formatDate(item.get('date')));
    };

    // Edit view

    var edit = $('.edit').get(0);
    edit.render = function(item) {
        item = item || { id: '', get: function() { return ''; } };

        $('input[name=id]', this).val(item.id);
        $('input[name=title]', this).val(item.get('title'));
        $('input[name=desc]', this).val(item.get('desc'));
    };

    edit.getTitle = function() {
        var model = this.view.model;

        if(model) {
            return model.get('title');
        }
        else {
            return 'New';
        }
    };

    $('button.add', edit).click(function() {
        var el = $(edit);
        var title = el.find('input[name=title]');
        var desc = el.find('input[name=desc]');
        var model = edit.model;

        if(model) {
            model.set({ title: title.val(), desc: desc.val() });
        }
        else {
            list.add({ title: title.val(),
                       desc: desc.val(),
                       date: new Date() });
        }

        edit.close();
    });
});
