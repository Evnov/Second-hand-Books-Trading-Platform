package com.bookmall.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * @author ella
 * @version 1.0
 * @description: TODO
 * @date 11/20/20
 */
public interface IFileService {
    String upload(MultipartFile file, String path);
}
