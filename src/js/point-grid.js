
/*globals document, ol3turf, turf */

//==================================================
// pointGrid control
//--------------------------------------------------
(function (ol3turf) {

    "use strict";

    // Control name
    var name = "point-grid";

    /**
     * Generate Point Grid
     * @private
     */
    var action = function (control) {

        // Define control ids
        var idCancel = ol3turf.utils.getName([name, "cancel"], control.prefix);
        var idCellSize = ol3turf.utils.getName([name, "cell-size"], control.prefix);
        var idForm = ol3turf.utils.getName([name, "form"], control.prefix);
        var idOk = ol3turf.utils.getName([name, "ok"], control.prefix);
        var idUnits = ol3turf.utils.getName([name, "units"], control.prefix);

        function onOK() {
            try {

                // Gather selected features
                var collection = ol3turf.utils.getCollection(control, 1, Infinity);

                // Gather form inputs
                var cellSize = ol3turf.utils.getFormNumber(idCellSize, "cell size");
                var units = ol3turf.utils.getFormString(idUnits, "units");

                // Collect polygons
                var bbox = turf.bbox(collection);
                var output = turf.pointGrid(bbox, cellSize, units);

                // Remove form and display results
                control.showForm();
                var inputs = {
                    bbox: bbox,
                    cellSize: cellSize,
                    units: units
                };
                control.toolbar.ol3turf.handler.callback(name, output, inputs);

            } catch (e) {
                control.showMessage(e);
            }
        }

        function onCancel() {
            control.showForm();
        }

        var controls = [
            ol3turf.utils.getControlNumber(idCellSize, "Cell Size", "Dimension of cell", "1", "any", "0"),
            ol3turf.utils.getControlSelect(idUnits, "Units", ol3turf.utils.getOptionsUnits()),
            ol3turf.utils.getControlInput(idOk, onOK, "", "OK"),
            ol3turf.utils.getControlInput(idCancel, onCancel, "", "Cancel")
        ];

        control.showForm(controls, idForm);

    };

    ol3turf.controls[name] = {
        /*
         * Create control then attach custom action and it's parent toolbar
         * @param toolbar Parent toolbar
         * @param prefix Selector prefix.
         */
        create: function (toolbar, prefix) {
            var title = "Generate Point Grid";
            var control = ol3turf.Control.create(toolbar, prefix, name, title, action);
            return control;
        }
    };

    return ol3turf;

}(ol3turf || {}));
