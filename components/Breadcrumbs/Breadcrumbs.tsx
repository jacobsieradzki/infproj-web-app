import React, { useEffect, useState } from 'react'
import { BreadcrumbSeparator, Container } from './Breadcrumbs.style'

type BreadcrumbItemProps = {
  label: string;
  url?: string;
}

type BreadcrumbsProps = {
  items: BreadcrumbItemProps[]
}

const BreadcrumbItem = ({ item, showSeparator }) => {
  if (item.url != null) {
    return (<>
      <a href={item.url}>{item.label}</a>
      {showSeparator && <BreadcrumbSeparator />}
    </>);
  } else {
    return (<>
      <p>{item.label}</p>
      {showSeparator && <BreadcrumbSeparator />}
    </>);
  }
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items: _items }) => {

  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(_items.filter(x => !!x.label));
  }, [_items])

  return (
    <Container>
      {items.filter(x => !!x.label).map((item, index) => (
        <BreadcrumbItem key={index} item={item} showSeparator={index != items.length - 1} />
      ))}
    </Container>
  )
}

export default Breadcrumbs