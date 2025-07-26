import prisma from "../../../utils/prisma"

const createBannerIntoDb=async(bannerInfo)=>{
      
    const result = await prisma.banner.create({
        data:bannerInfo
    })
    return result
}

export const BannerServices={
    createBannerIntoDb
}