import React from 'react';

import { Box, Button, Container, Paper, TextField } from '@mui/material';
import { useAuth } from '../../store';
import { Navigate, useParams } from 'react-router-dom';
import { ICreatePost } from '../../@types';
import { useCreatePost } from '../../hooks/posts/useCreatePost';
import { PostsService } from '../../services/posts.service';
import { useEditPost } from '../../hooks/posts/useEditPost';
import { Tags } from '../../components/Tags';

import SimpleMDE from 'react-simplemde-editor';
import ImgService from '../../services/img.service';
import 'easymde/dist/easymde.min.css';
import styles from './WritePost.module.scss';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const WritePost: React.FC = () => {
  const { id } = useParams();
  const isAuth = useAuth((state) => state.isAuth);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState<string[]>([]);
  const [imageUrl, setImageUrl] = React.useState('');
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const tagRef = React.useRef<HTMLInputElement>(null);

  const isEditing = Boolean(id);

  const { mutate: createPost } = useCreatePost();
  const { mutate: editPost } = useEditPost();

  // Сохранение данных при редактировании статьи
  React.useEffect(() => {
    if (id) {
      PostsService.fetchOnePost(id)
        .then(({ data }) => {
          setTags(data.tags);
          setText(data.text);
          setTitle(data.title);
          setImageUrl(data.imageUrl);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }, []);

  // Загрузка изображения на backend
  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      if (!e.target.files) throw new Error('Отсутствует файл изображения!');
      const file = e.target.files[0];
      formData.append('image', file);
      const { data } = await ImgService.uploadImg(formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      toast.error('Ошибка при загрузке файла!');
    }
  };

  // Удаление изображения когда оно загружено
  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value: string) => {
    setText(value);
  }, []);

  // Создание или редактирование статьи
  const onSumbit = async () => {
    const fields = {
      title,
      imageUrl,
      tags,
      text,
    } as ICreatePost;
    if (id && isEditing) {
      editPost({ id, fields });
    } else {
      createPost(fields);
    }
  };

  // Логика сохранения тэгов
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tagRef.current?.value) {
      setTags([...tags, tagRef.current?.value]);
      tagRef.current.value = '';
    }
  };

  // Удаление тэгов
  const handleOnDelete = (value: string) => {
    const newTags = tags.filter((val) => val !== value);
    setTags(newTags);
  };

  const options = React.useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      maxHeight: '400px',
      placeholder: 'Введите текст',
      status: false,
    };
  }, []);

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="lg" className={styles.containerPost}>
      <Paper style={{ padding: 30, marginBottom: '30px' }}>
        <Button
          color="secondary"
          variant="outlined"
          size="large"
          onClick={() => inputFileRef.current?.click()}
        >
          Загрузить превью
        </Button>
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          hidden
        />
        {imageUrl && (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={onClickRemoveImage}
              sx={{ marginLeft: '10px' }}
            >
              Удалить
            </Button>
            <img
              className={styles.image}
              src={`http://localhost:5000/api${imageUrl}`}
              alt="Uploaded"
            />
          </>
        )}
        <br />
        <br />
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Заголовок статьи..."
          value={title}
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
        />
        <form onSubmit={handleOnSubmit}>
          <TextField
            classes={{ root: styles.tags }}
            variant="standard"
            placeholder="Нажмите Enter чтобы записать ваш тэг"
            fullWidth
            inputRef={tagRef}
            InputProps={{
              startAdornment: (
                <Box sx={{ margin: '0 0.2rem 0 0', display: 'flex' }}>
                  {tags.map((data: string, index: number) => {
                    return (
                      <Tags
                        data={data}
                        key={index}
                        handleOnDelete={handleOnDelete}
                      />
                    );
                  })}
                </Box>
              ),
            }}
          />
        </form>

        <SimpleMDE
          className={styles.editor}
          value={text}
          onChange={onChange}
          options={options}
        />
        <div className={styles.buttons}>
          <Button
            onClick={onSumbit}
            size="large"
            variant="contained"
            color="secondary"
          >
            {isEditing ? 'Сохранить' : 'Опубликовать'}
          </Button>
          <Link to="/">
            <Button size="large" color="secondary">
              Отмена
            </Button>
          </Link>
        </div>
      </Paper>
    </Container>
  );
};
