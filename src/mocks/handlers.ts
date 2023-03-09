import { rest } from 'msw'
import colors from "./data/colors.json"

type ReqBody = {
  name: string,
  code: string
}

type ResBody = {
  id: string,
  name: string,
  code: string
}

export const handlers = [
  //カラーリストをgetするリクエスト
  rest.get("/mock/colors-list", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(colors))
  }),
  rest.post<ReqBody, ResBody>("/mock/create-color", async (req, res, ctx) => {
    const { name, code } = await req.json()

    console.log("reqの中身から取り出したname", name)
    console.log("reqの中身から取り出したcode", code)
    if(colors.find((color: any) => color.code === code)) {
      //重複するカラーコードがあった場合はエラー
      return res(
        ctx.status(409),
        ctx.json({ errorMessage: `${code}はすでに登録されています` })
      )
    }

    return res(
      ctx.status(201),
      ctx.json({ id: "uuid-5", name, code})
    )
  })
]
