const db = require('../models');

const User = db.user;
const Theme = db.theme;



exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };

exports.updatetheme = (req, res, next)=>{
  User.findOne({where:{username:req.body.username}}).then((username)=>{
    if(!username)
    {
      res.status(400).send('username not found');
    }
     let themename = req.body.themename?req.body.themename:'transparent';
    
      Theme.findOne({where:{theme_name:themename}}).then((theme)=>{
          if(!theme)
          {
            Theme.findAll({attributes: ['theme_id']}).then((data)=>{
              let id = data[data.length-1].dataValues.theme_id+1;
              Theme.create({ theme_id:id, theme_name:themename}).then((data)=>{
                if(!data)
                {
                  res.status(400).send('error while adding theme')
                }
                console.log('updating', data);
                User.update({themeId:id},{where:{username:req.body.username}}).then((data)=>{

                  if(!data)
                  {
                    res.status(400).send('error while updating theme')
                  }else{
                    res.status(200).send(JSON.stringify(themename));
                  }
                
                }).catch((err)=>{
                  console.log(err);
                  res.status(500).send({message:err.message})
                })
      
              })
            }).catch((err)=>{
              res.send({message:err.message})
            })
            
          }
   
         
          
        }).catch((err)=>{
          res.status(500).send({message:err.message})
        })
       

     
     
  }).catch((err)=>{
    res.status(500).send({ message: err.message });
  })
}

exports.gettheme=(req, res, next)=>{

    User.findOne({where:{username:req.body.username}}).then((user)=>{
  
     if(!user)
     {
        res.status(400).send('user not found');
     }
     if(user?.dataValues?.themeId)
     { Theme.findOne({where:{theme_id:user.dataValues.themeId}}).then((theme)=>{

        let themename='transparent';
        console.log('themeMYYYYYYYYYYYYYY', theme);
        if(theme)
        {
          themename=theme.dataValues.theme_name;
        }
        req.body.theme=themename;
        next();
      }).catch((err)=>{
        res.status(500).send({message:err.message})
      })
    }else{
        User.update({theme_id:0}, {where:{username:req.body.username}}).then((data)=>{
          
          if(!data)
          {
            req.body.theme=''
          }else{
            req.body.theme='transparent'
          }
          next();
        }).catch((err)=>{
          res.status(500).send({message:err.message})
        })
      }
     

    }).catch((err)=>{
      res.status(500).send({ message: err.message });
    })
    


}

