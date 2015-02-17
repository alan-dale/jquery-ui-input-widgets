;(function($, window, document, undefined) {

  $.widget('inputWidgets.numericInput', {

    // Defaults
    options: {
      min: 0,
      max: 9999
    },

    _create: function() {
      this.options.min = (Number(this.options.min) === this.options.min && this.options.min % 1 === 0) ? this.options.min : 0;
      this.options.max = (Number(this.options.max) === this.options.max && this.options.max % 1 === 0) ? this.options.max : 9999;
      this.options.min = (this.options.min > this.options.max) ? this.options.max : this.options.min;

      this._on(this.element, {
        keypress: function(event) {
          // If user hits enter key, refresh the input
          if (event.which == 13) {
            this.refresh();
            return false;
          }

          // If the keypress was non-numeric, don't allow it to be entered
          if (event.which != 8 && event.which != 0 && (event.which < 48 || event.which > 57)) {
            return false;
          }
        },
        blur: function(event) {
          this.refresh();
        }
      });
    },

    refresh: function() {
      var currentVal = this.element.val();
      currentVal.replace(/\D/g,'');
      currentVal = parseInt(currentVal);
      if (!isNaN(currentVal) && (Number(currentVal) === currentVal && currentVal % 1 === 0)) {
        if (currentVal < this.options.min) {
          currentVal = this.options.min;
        }
        else if (currentVal > this.options.max) {
          currentVal = this.options.max;
        }
      }
      else {
        currentVal = this.options.min;
      }
      this.element.val(currentVal);

      this._trigger('refresh', event, {
        value: this.element.val(),
        min: this.options.min,
        max: this.options.max
      });
    },

    _destroy: function() {},

    _setOptions: function(options) {
      var that = this;

      // Need to set max first to avoid minimum logic errors
      if (typeof options.max != 'undefined') {
        that._setOption('max', options.max);
        delete options.max;
      }

      // Set the other options
      $.each(options, function(key, value) {
        that._setOption(key, value);
      });
    },

    _setOption: function(key, value) {
      switch (key) {
        case 'min':
          value = (Number(value) === value && value % 1 === 0) ? value : 0;
          value = (value > this.options.max) ? this.options.max : value;
          break;
        case 'max':
          value = (Number(value) === value && value % 1 === 0) ? value : 9999;
          value = (value < this.options.min) ? this.options.min : value;
          break;
        default:
          break;
      }
      this._super(key, value);
    }
  });

})(jQuery, window, document);