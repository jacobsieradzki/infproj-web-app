import { useRouter } from 'next/router'
import React from 'react'
import { NextPage } from 'next'
import NewMenuRoot from 'components/NewMenu/NewMenuRoot'

const Page: NextPage = () => {
  let router = useRouter();
  let view = router.query.view?.toString();

  if (view === "event") return <NewMenuRoot menu={"EVENT"} />
  if (view === "resource") return <NewMenuRoot menu={"RESOURCE"} />
  return <></>;
}

export default Page