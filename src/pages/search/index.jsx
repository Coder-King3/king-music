import React, { memo, useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTrackDataAction } from '@/store/features/track'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { Col, Row } from 'antd'
import TrackCard from './cpns/track-card'
import CoverRow from '@/components/cover-row'
import SongList from './cpns/song-list'
import { SearchWrapper } from './style'
import eventBus from '@/utils/eventBus'

const Search = memo(() => {
  //! props and state
  const [isShow, setIsShow] = useState(false)

  //! redux hooks
  const dispatch = useDispatch()
  const searchMode = useSelector(({ common }) => common.searchMode)
  const artists = useSelector(({ track }) => track.artists)
  const albums = useSelector(({ track }) => track.albums)
  const songs = useSelector(({ track }) => track.songs)
  const playlists = useSelector(({ track }) => track.playlists)
  const searchTrackData = (params) => dispatch(fetchTrackDataAction(params))

  //! other hooks
  const keywordsRef = useRef()
  useEffect(() => {
    eventBus.on('search', (keywords, querys, cycleStartFns, cycleEndFns) => {
      if (keywords && keywords.trim() != '') keywordsRef.current = keywords
      const fetchTrackParams = {
        keywords: keywordsRef.current,
        querys,
        fetchCycle: {
          cycleStart: () => {
            Array.isArray(cycleStartFns) &&
              cycleStartFns.forEach((cycleFn) => {
                if (typeof cycleFn === 'function') cycleFn()
              })
          },
          cycleEnd: () => {
            Array.isArray(cycleEndFns) &&
              cycleEndFns.forEach((cycleFn) => {
                if (typeof cycleFn === 'function') cycleFn()
              })
          }
        }
      }
      searchTrackData(fetchTrackParams)
    })
  }, [])

  return (
    <SearchWrapper className="search-wrapper">
      <Row gutter={24}>
        <Col span={12}>
          <CSSTransition
            key="artists-transition"
            in={searchMode ? false : artists && artists.length > 0}
            timeout={500}
            classNames="fade"
            unmountOnExit={true}
          >
            <TrackCard title="歌手">
              <CoverRow
                items={artists.slice(0, 3)}
                type="artist"
                columnNumber={3}
                gap="32px"
              ></CoverRow>
            </TrackCard>
          </CSSTransition>
        </Col>
        <Col span={12}>
          <CSSTransition
            key="albums-transition"
            in={searchMode ? false : albums && albums.length > 0}
            timeout={500}
            classNames="fade"
            unmountOnExit={true}
          >
            <TrackCard title="专辑">
              <CoverRow
                items={albums.slice(0, 3)}
                type="album"
                subText="artist"
                columnNumber={3}
                gap="32px"
              ></CoverRow>
            </TrackCard>
          </CSSTransition>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <CSSTransition
            key="songs-transition"
            in={searchMode ? false : songs && songs.length > 0}
            timeout={500}
            classNames="fade"
            unmountOnExit={true}
          >
            <TrackCard title="单曲">
              <SongList
                songs={songs}
                type="songs"
                columnNumber={4}
                classNames="dq"
                gap="12px 16px"
              ></SongList>
            </TrackCard>
          </CSSTransition>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <CSSTransition
            key="playlists-transition"
            in={searchMode ? false : playlists && playlists.length > 0}
            timeout={500}
            classNames="fade"
            unmountOnExit={true}
          >
            <TrackCard title="歌单">
              <CoverRow
                items={playlists.slice(0, 12)}
                type="playlist"
                columnNumber={6}
                gap="24px 32px"
              ></CoverRow>
            </TrackCard>
          </CSSTransition>
        </Col>
      </Row>
    </SearchWrapper>
  )
})

export default Search
