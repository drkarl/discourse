/**
  A view to display a site setting with edit controls

  @class SiteSettingView
  @extends Discourse.View
  @namespace Discourse
  @module Discourse
**/
Discourse.SiteSettingView = Discourse.View.extend(Discourse.ScrollTop, {
  classNameBindings: [':row', ':setting', 'content.overridden'],

  preview: function() {
    var preview = this.get('content.preview');
    if(preview){
      return new Handlebars.SafeString("<div class='preview'>" +
                                        preview.replace("{{value}}",this.get('content.value')) +
                                        "</div>"
                                        );
    }
  }.property('content.value'),

  templateName: function() {
    // If we're editing a boolean, show a checkbox
    if (this.get('content.type') === 'bool') return 'admin/templates/site_settings/setting_bool';

    // If we're editing an enum field, show a dropdown
    if (this.get('content.type') === 'enum') return 'admin/templates/site_settings/setting_enum';

    // If we're editing a list, show a list editor
    if (this.get('content.type') === 'list') return 'admin/templates/site_settings/setting_list';

    // Default to string editor
    return 'admin/templates/site_settings/setting_string';

  }.property('content.type'),

  _watchEnterKey: function() {
    var self = this;
    this.$().on("keydown.site-setting-enter", ".input-setting-string", function (e) {
      if (e.keyCode === 13) { // enter key
        var setting = self.get('content');
        if (setting.get('dirty')) {
          setting.save();
        }
      }
    });
  }.on('didInsertElement'),

  _removeBindings: function() {
    this.$().off("keydown.site-setting-enter");
  }.on("willDestroyElement")

});
