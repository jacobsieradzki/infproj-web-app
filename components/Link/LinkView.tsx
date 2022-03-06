import React from 'react'
import Image from 'next/image'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CaptionUppercase } from 'components/GlobalStyles'
import LinkStyles from 'components/Link/Link.style'

type LinkViewProps = {
  title: string;
  subtitle?: string | React.ReactElement;
  image?: any;
  contentImage?: any;
  caption?: string | React.ReactElement;
  icon?: IconDefinition;
  color: string;
  href?: string;
  openInNewTab?: boolean;
  onClick?: () => void;
}

const LinkView: React.FC<LinkViewProps> = ({
  title,
  subtitle,
  image,
  contentImage,
  caption,
  icon = null,
  color,
  href,
  openInNewTab = true,
  onClick = () => {}
}) => {

  let className = !subtitle ? "center" : ""

  if (href) {
    return (
      <LinkStyles.Link href={href} onClick={onClick} target={openInNewTab ? "_blank" : null} className={"link-prev " + className}>
        {icon && <FontAwesomeIcon icon={icon} color={color} className={'icon'} />}
        {image && <Image className={"icon"} src={image} alt={title} />}
        <LinkStyles.Content>
          <p>{title}</p>
          {caption && <CaptionUppercase className={"caption"}>{caption}</CaptionUppercase>}
          {subtitle && <span className={"content"}>{subtitle}</span>}
          {contentImage && <Image className={'content'} src={contentImage} alt={title} />}
        </LinkStyles.Content>
      </LinkStyles.Link>
    )
  }

  return (
    <LinkStyles.Container onClick={onClick} className={"link-prev " + className}>
      {icon && <FontAwesomeIcon icon={icon} color={color} className={'icon'} />}
      {image && <Image className={"icon"} src={image} alt={title} />}
      <LinkStyles.Content>
        <p>{title}</p>
        {caption && <CaptionUppercase className={"caption"}>{caption}</CaptionUppercase>}
        {subtitle && <span>{subtitle}</span>}
        {contentImage && <Image className={'content'} src={contentImage} alt={title} />}
      </LinkStyles.Content>
    </LinkStyles.Container>
  )
}

export default LinkView;