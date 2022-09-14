// React
import React, { useCallback, useState } from 'react'

// Tiptap
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// Tiptap Extencions
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'

const MenuBar = ({ editor, setLink }) => {

    if (!editor) {
        return null
    }

    return (
        <>
            <span onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`key-btn ${editor.isActive('heading', { level: 1 }) ? 'active' : ''}`} >h1</span>
            <span onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`key-btn ${editor.isActive('heading', { level: 2 }) ? 'active' : ''}`} >h2</span>
            <span onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`key-btn ${editor.isActive('heading', { level: 3 }) ? 'active' : ''}`} >h3</span>
            <span onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={`key-btn ${editor.isActive('heading', { level: 4 }) ? 'active' : ''}`} >h4</span>
            <span onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} className={`key-btn ${editor.isActive('heading', { level: 5 }) ? 'active' : ''}`} >h5</span>
            <span onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()} className={`key-btn ${editor.isActive('heading', { level: 6 }) ? 'active' : ''}`} >h6</span>
            <span onClick={() => editor.chain().focus().toggleBold().run()} className={`key-btn ${editor.isActive('bold') ? 'active' : ''}`} >bold</span>
            <span onClick={() => editor.chain().focus().toggleBulletList().run()} className={`key-btn ${editor.isActive('bulletList') ? 'active' : ''}`} >ul</span>
            <span onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`key-btn ${editor.isActive('orderedList') ? 'active' : ''}`} >ol</span>
            <span onClick={() => editor.chain().focus().toggleUnderline().run()} className={`key-btn ${editor.isActive('underline') ? 'active' : ''}`} >u</span>
            <span onClick={setLink} className={`key-btn ${editor.isActive('link') ? 'active' : ''}`} >link</span>
            <span onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')} className='key-btn' >quitar link</span>
        </>
    )
}

export default function Tiptap () {

    const [isCode, setIsCode] = useState(true)

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
            }),
        ],
        content: ``,
    })

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)
    
        // cancelled
        if (url === null) {
            return
        }
    
        // empty
        if (url === '') {
          editor.chain().focus().extendMarkRange('link').unsetLink().run()
    
          return
        }
    
        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        
    }, [editor])

    return (
        <div className='main'>
            <div className='wapped'>
                <div className='editor-content'>
                    <div className='keys-content'>
                        <MenuBar editor={editor} setLink={setLink}/>
                    </div>
                    <div className='editor'>
                        <EditorContent editor={editor} />
                    </div>
                </div>
            </div>
            <div className='wapped'>
                <div className='editor-content'>
                    <div className='switch'>
                        <button className='switch-option' onClick={() => setIsCode(true)}>JSON</button>
                        <button className='switch-option' onClick={() => setIsCode(false)}>HTML</button>
                    </div>

                    { isCode ? 
                    <div>
                        <pre>
                            <code>{ editor != null ? JSON.stringify(editor.getJSON(), null, 2) : '' }</code>
                        </pre>
                    </div>
                    :
                    <div>
                        { editor != null ? JSON.stringify(editor.getHTML()) : '' }
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}