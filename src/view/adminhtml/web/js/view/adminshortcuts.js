define(
    [
        'jquery',
        'mousetrap',
        'Magento_Ui/js/modal/modal',
        'ko',
        'uiComponent',
        'collapsible'
    ],
    function ($, Mousetrap, modal, ko, Component) {

        (function(Mousetrap) {
            var _globalCallbacks = {};
            var _originalStopCallback = Mousetrap.prototype.stopCallback;

            Mousetrap.prototype.stopCallback = function(e, element, combo, sequence) {
                var self = this;

                if (self.paused) {
                    return true;
                }

                /** Customisation for applying filters automatically **/
                if (combo == 'enter' && jQuery(element).parents('div[data-part="filter-form"]')) {
                    jQuery(element).trigger('blur');
                    return false;
                }

                if (_globalCallbacks[combo] || _globalCallbacks[sequence]) {
                    return false;
                }

                return _originalStopCallback.call(self, e, element, combo);
            };

            Mousetrap.init();
        }) (Mousetrap);

        /* Open keyboard shortcut modal info window */
        Mousetrap.bind('?', function() { openModal(); });

        /* Go to products */
        Mousetrap.bind('g p', function() { execShortcut('menu-magento-catalog-catalog-products'); });

        /* Go to orders */
        Mousetrap.bind('g o', function() { execShortcut('menu-magento-sales-sales-order'); });

        /* Go to customers */
        Mousetrap.bind('g c', function() { execShortcut('menu-magento-customer-customer-manage'); });

        /* Go to system configuration */
        Mousetrap.bind('g x', function() { execShortcut('menu-magento-config-system-config'); });

        /* Go to dashboard */
        Mousetrap.bind('g d', function() { execShortcut('menu-magento-backend-dashboard'); });

        /* Open Filters */
        Mousetrap.bind('/', function() {
            jQuery("button[data-action='grid-filter-expand']").click();
            jQuery('div[data-part="filter-form"]:not(.filter) :input:visible:enabled:first').focus();
            return false;
        });

        /* Apply filter on enter */
        Mousetrap.bind('enter', function() {
            jQuery('button[data-action="grid-filter-apply"]').click();
        });

        /* Pagination on grids */
        /* Previous */
        Mousetrap.bind('k', function() {
            jQuery('div[data-role="data-grid-toolbar"]').find('button.action-previous').click();
        });
        /* Next */
        Mousetrap.bind('j', function() {
            jQuery('div[data-role="data-grid-toolbar"]').find('button.action-next').click();
        });

        /* Global Search */
        Mousetrap.bind('shift+f', function() {
            jQuery('.search-global-label').click();
            return false;
        });

        function openModal() {

            this.modal = jQuery('#brabs-admin-shortcuts-modal').modal({
                modalClass: 'modal-system-messages ui-popup-message',
                type: 'popup',
                buttons: []
            });

            jQuery("#brabs-admin-shortcuts-modal").removeClass("hidden");

            this.modal.modal('openModal');

        }

        function execShortcut(cssClass) {
            var href = jQuery("li[data-ui-id='" + cssClass + "'] a").attr("href");
            if (href) {
                window.setLocation(href);
            } else {
                alert("Shortcut not available");
            }
        }

        return Component.extend({
            defaults: {
                template: 'Brabs_AdminShortcuts/adminshortcuts'
            },

            initialize: function () {
                this._super();
            },

        });

    }
);