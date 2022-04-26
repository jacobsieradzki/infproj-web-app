import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faCode, faFileAlt, faWindowMaximize } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { NextPage } from 'next'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Layout = styled.div`
  text-align: center;
  width: 90%;
  margin: 0 auto;
  
  .space {
    height: 40px;
  }
  
  a {
    display: block;
    margin: 20px auto;
    padding: 20px 24px;
    background-color: white;
    color: var(--background-color);
    font-size: 18px;
    font-weight: 600;
    width: min(100%, 500px);
    cursor: pointer;
    transition: all 0.1s;
    
    &:hover {
      transform: scale(1.03);
    }

    &:active {
      transform: scale(1.01);
    }
  }
`;

const Page: NextPage = () => {
  return (
    <Layout>
      <h1>Interactive streaming platform for educational use</h1>
      <span>Dissertation</span>
      <p>Jacob Ryan Sieradzki</p>

      <div className={"space"} />

      <a href={"/dissertation.pdf"}>
        <FontAwesomeIcon icon={faFileAlt} />
        &nbsp;
        Dissertation
      </a>

      <div className={"space"} />

      <h2>
        {/*@ts-ignore*/}
        <FontAwesomeIcon icon={faGithub} />
        &nbsp;
        Repositories
      </h2>


      <a href={"https://github.com/jacobsieradzki/infproj-web-app"}>
        <FontAwesomeIcon icon={faWindowMaximize} />
        &nbsp;
        Website
      </a>

      <a href={"https://github.com/jacobsieradzki/inf-project-server"}>
        <FontAwesomeIcon icon={faCode} />
        &nbsp;
        Backend
      </a>
    </Layout>
  )
}

export default Page;