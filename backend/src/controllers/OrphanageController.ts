
import {  Request, Response } from 'express';
import * as Yup from 'yup';
import {getRepository} from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';


class OphanageController {

  public async index(request:Request,response:Response):Promise<Response>{
    const orphanageRepository =  getRepository(Orphanage);
    const orphanages = await orphanageRepository.find({
      relations:['images']
    })

    return response.status(201).json(orphanageView.renderMany(orphanages))
  }

  public async show(request:Request,response:Response):Promise<Response>{

    const{ id }= request.params
    const orphanageRepository = getRepository(Orphanage);

    const orphanage = await orphanageRepository.findOneOrFail(id,{relations:['images']})


    return response.status(201).json(orphanageView.render(orphanage))
  }

   public async create(request:Request,response:Response):Promise<Response>{

       const {name, latitude,longitude,about,instructions, opening_hours, open_on_weekend} = request.body

    const orphanageRepository = getRepository(Orphanage);

    const requesImages = request.files as Express.Multer.File[];
      const images = requesImages.map(image =>{
        return {
          path: image.filename
        }
      })

const data = {
  name,
  latitude,
  longitude,
  about,
  instructions,
  opening_hours,
  open_on_weekend:open_on_weekend === 'true',
  images
}


    const schema = Yup.object().shape({
      name:Yup.string().required(),
      latitude:Yup.number().required(),
      longitude:Yup.number().required(),
      about:Yup.string().required().max(300),
      instructions:Yup.string().required(),
      opening_hours:Yup.string().required(),
      open_on_weekend:Yup.boolean().required(),
      images:Yup.array(Yup.object().shape({
        path:Yup.string().required()
      }))
    })



    await schema.validate(data,{abortEarly:false})

    const orphanage = orphanageRepository.create(data)
    await orphanageRepository.save(orphanage)

     return response.status(201).json(orphanage);

    }

}

export default OphanageController
