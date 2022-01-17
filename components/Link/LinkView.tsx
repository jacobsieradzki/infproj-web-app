import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinkStyles from 'components/Link/Link.style'
import React from 'react'

type LinkViewProps = {
  title: string;
  subtitle: string;
  icon: IconDefinition;
  color: string;
  href?: string;
  openInNewTab?: boolean;
  onClick?: () => void;
}

const LinkView: React.FC<LinkViewProps> = ({
  title,
  subtitle,
  icon,
  color,
  href,
  openInNewTab = true,
  onClick = () => {}
}) => {

  if (href) {
    return (
      <LinkStyles.Link href={href} onClick={onClick} target={openInNewTab ? "_blank" : null}>
        <FontAwesomeIcon icon={icon} color={color} size={"lg"} />
        <LinkStyles.Content>
          <p>{title}</p>
          {subtitle && <span>{subtitle}</span>}
        </LinkStyles.Content>
      </LinkStyles.Link>
    )
  }

  return (
    <LinkStyles.Container onClick={onClick}>
      <FontAwesomeIcon icon={icon} color={color} size={"lg"} />
      <LinkStyles.Content>
        <p>{title}</p>
        {subtitle && <span>{subtitle}</span>}
      </LinkStyles.Content>
    </LinkStyles.Container>
  )
}

export default LinkView;