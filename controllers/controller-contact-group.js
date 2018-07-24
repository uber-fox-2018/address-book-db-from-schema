const ConctacGroup = require('../models/contact-group')
const View = require('../view')

class ControllerContactGroup {
    
    static transferContactGroup() {
        ConctacGroup.transfer((err) => {
            if(err) throw err;
            let result = `transfer data contactgroup success`
            View.showResult(result)
        })
    }

    static showGroup(name) {
        ConctacGroup.show(name, (err, data) => {
            if(err) {
                View.showError(err)
            }else {
                Views.showResult(data)
            }
        })
    }

}

module.exports = ControllerContactGroup;