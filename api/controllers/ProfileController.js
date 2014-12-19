/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `ProfileController.create()`
   */
  create: function (req, res) {
    var userid = req.param('userid');
    

    PersonalInfo.create({      
      name: 'stan Xi',
      sex: 'girl'
    }).exec(function createCB(err,created){
        if(err){
            return res.json({
              success: false
            });
        }else{
            console.log('Created PersonalInfo with name '+created.name);  
            Profile.create({
              userid:userid,
              personalInfo: created
            }).exec(function createCB(err,created){
                if(err){
                    return res.json({
                      success: false
                    });
                }else{
                    console.log('Created user with name '+created.name);  

                    return res.json({
                      success: true,
                      profile: created
                    });
                } 
            });
            //////////////////////////////////////////////////////////////            
        } 
    });

  
      
  },


  /**
   * `ProfileController.show()`
   */
  show: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  },


  /**
   * `ProfileController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },


  /**
   * `ProfileController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  }
};

